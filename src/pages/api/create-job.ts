import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { ImmutableHeaders, ImmutableURL } from "immurl";
import dedent from "dedent";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const bodyParsedResult = bodySchema.safeParse(req.body);

  if (!bodyParsedResult.success) {
    return res.status(400).json(bodyParsedResult.error);
  }

  const gh = new GithubAPI.Client(
    constants.GITHUB_AUTH_USERNAME,
    constants.GITHUB_AUTH_TOKEN
  );

  const branchName = `jobs/${new Date().toISOString().replace(/[:\.]/g, "_")}`;

  const repo = {
    owner: constants.GITHUB_OWNER,
    repo: constants.GITHUB_REPO,
  } as const;

  const masterRef = await gh.getRef({
    ...repo,
    ref: `heads/${constants.GITHUB_BASE_BRANCH}`,
  });

  // For some reason this produces a 404? WTF
  const prBranchRef = await gh.createRef({
    ...repo,
    ref: `refs/heads/${branchName}`,
    sha: masterRef.object.sha,
  });

  const createFileResult = await gh.createFile({
    ...repo,
    content: Buffer.from(getJobMarkdownContent(bodyParsedResult.data)).toString(
      "base64"
    ),
    message: "Add job",
    path: `src/pages/${new Date().toISOString()}/index.mdx`,
    branch: branchName,
  });

  if (createFileResult !== "Created") {
    throw new Error(
      `Couldn't create file for some reason. Result: ${createFileResult}`
    );
  }

  const pullRequest = gh.createPullRequest({
    ...repo,
    base: constants.GITHUB_BASE_BRANCH,
    head: branchName,
    title: "New job",
    body: "New job listing submitted via the website.",
    maintainer_can_modify: true,
    draft: false,
  });

  res.status(200).json({
    pullRequest: pullRequest,
  });
}

function isValidDate(d: any): d is Date {
  return d instanceof Date && !isNaN(Number(d));
}

const zodDateRefineArgs = [
  (dateString: string) => isValidDate(new Date(dateString)),
  {
    message: "Invalid date string",
  },
] as const;

const bodySchema = z.object({
  creator: z.object({
    email: z.string().email(),
  }),
  title: z.string().nonempty().max(100),
  role: z.string().nonempty().max(100),
  salary: z.string().nonempty().max(100),
  company: z.string().nonempty().max(100),
  location: z.string().nonempty().max(100),
  seniority: z.string().nonempty().max(100),
  expiryDate: z.string().refine(...zodDateRefineArgs),
  content: z.string().nonempty().max(10_000),
  apply: z.string().max(500).optional(),
});

const constants = {
  GITHUB_REPO: "norfolkdevelopers-website",
  GITHUB_BASE_BRANCH: "master",
  GITHUB_OWNER: process.env.JOBS_BOT_GITHUB_OWNER!,
  GITHUB_AUTH_TOKEN: process.env.JOBS_BOT_GITHUB_AUTH_TOKEN!,
  GITHUB_AUTH_USERNAME: process.env.JOBS_BOT_GITHUB_AUTH_USERNAME!,
} as const;

function getJobMarkdownContent(body: z.TypeOf<typeof bodySchema>): string {
  return dedent`
    ---
    layout: job
    title: ${body.title}
    date: '${new Date().toUTCString()}'
    expiryDate: '${new Date(body.expiryDate)}'
    role: ${body.role}
    salary: ${body.salary}
    company: ${body.company}
    location: ${body.location}
    seniority: ${body.seniority}
    ${body.apply ? `apply: ${body.apply}` : ""}
    ---

    ${body.content}
  `;
}

namespace GithubAPI {
  export class Client {
    constructor(readonly username: string, readonly token: string) {}

    private static ROOT_URL = new ImmutableURL("https://api.github.com");

    private async fetch(url: string, options?: RequestInit) {
      const headers = new ImmutableHeaders({
        Accept: "application/vnd.github.v3+json",
        Authorization: `Basic ${Buffer.from(
          `${this.username}:${this.token}`
        ).toString("base64")}`,
      });

      return fetch(url, { headers, ...options });
    }

    async createRef({ ref, sha, owner, repo }: CreateRefProps): Promise<Ref> {
      const url = Client.ROOT_URL.set(
        "pathname",
        `/repos/${owner}/${repo}/git/refs`
      );

      return (
        await this.fetch(url.toString(), {
          method: "POST",
          body: JSON.stringify({
            ref,
            sha,
          }),
        })
      ).json();
    }

    async getRef({ ref, owner, repo }: GetRefProps): Promise<Ref> {
      const url = Client.ROOT_URL.set(
        "pathname",
        `/repos/${owner}/${repo}/git/ref/${ref}`
      );

      return (await this.fetch(url.toString())).json();
    }

    async createPullRequest({
      owner,
      repo,
      ...body
    }: CreatePullRequestProps): Promise<PullRequest> {
      const url = Client.ROOT_URL.set(
        "pathname",
        `/repos/${owner}/${repo}/pulls`
      );

      return (
        await this.fetch(url.toString(), {
          method: "POST",
          body: JSON.stringify(body),
        })
      ).json();
    }

    async createFile({
      owner,
      repo,
      path,
      ...body
    }: CreateFileProps): Promise<CreateFileResult> {
      const url = Client.ROOT_URL.set(
        "pathname",
        `/repos/${owner}/${repo}/contents/${path}`
      );

      const response = await this.fetch(url.toString(), {
        method: "PUT",
        body: JSON.stringify(body),
      });

      if (response.status === 200 || response.status === 201) {
        return "Created";
      }

      if (response.status === 404) {
        return "NotFound";
      }

      if (response.status === 409) {
        return "Conflict";
      }

      if (response.status === 422) {
        return "UnprocessableEntity";
      }

      return "OtherError";
    }
  }

  export interface Ref {
    ref: string;
    node_id: string;
    url: string;
    object: {
      type: string;
      sha: string;
      url: string;
    };
  }

  interface CreateRefProps {
    sha: string;
    ref: string;
    owner: string;
    repo: string;
  }

  interface GetRefProps {
    owner: string;
    repo: string;
    ref: string;
  }

  export interface PullRequest {
    url: string;
  }

  interface CreatePullRequestProps {
    owner: string;
    repo: string;
    title?: string;
    head: string;
    base: string;
    body?: string;
    maintainer_can_modify?: boolean;
    draft?: boolean;
    issue?: number;
  }

  interface CreateFileProps {
    owner: string;
    repo: string;
    path: string;
    message: string;
    content: string;
    branch?: string;
  }

  type CreateFileResult =
    | "Created"
    | "NotFound"
    | "Conflict"
    | "UnprocessableEntity"
    | "OtherError";
}
