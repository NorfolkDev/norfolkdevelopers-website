import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

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

  const branchName = `jobs/${new Date().toISOString()}`;

  const repo = {
    owner: constants.GITHUB_OWNER,
    repo: constants.GITHUB_REPO,
  } as const;

  const masterRef = await gh.getRef({
    ...repo,
    ref: `refs/heads/${constants.GITHUB_BASE_BRANCH}`,
  });

  const prBranchRef = await gh.createRef({
    ...repo,
    name: branchName,
    sha: masterRef.object.sha,
  });

  const createFileResult = await gh.createFile({
    ...repo,
    content: getJobMarkdownContent(bodyParsedResult.data),
    message: "Add job",
    path: `/src/pages/${new Date().toISOString()}/index.mdx`,
    branch: branchName,
  });

  if (createFileResult !== "Created") {
    throw new Error(
      `Couldn't create file for some reason. Result: ${createFileResult}`
    );
  }

  const pullRequest = gh.createPullRequest();
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
});

const constants = {
  GITHUB_REPO: "norfolkdevelopers-website",
  GITHUB_BASE_BRANCH: "master",
  GITHUB_OWNER: process.env.JOBS_BOT_GITHUB_OWNER!,
  GITHUB_AUTH_TOKEN: process.env.JOBS_BOT_GITHUB_AUTH_TOKEN!,
  GITHUB_AUTH_USERNAME: process.env.JOBS_BOT_GITHUB_AUTH_USERNAME!,
} as const;

function getJobMarkdownContent(body: z.TypeOf<typeof bodySchema>): string {}

namespace GithubAPI {
  export class Client {
    constructor(readonly username: string, readonly token: string) {}

    async createRef({ name, sha, owner, repo }: CreateRefProps): Promise<Ref> {
      // https://docs.github.com/en/rest/reference/git#references
    }

    async getRef({ ref, owner, repo }: GetRefProps): Promise<Ref> {
      // https://docs.github.com/en/rest/reference/git#references
    }

    async createPullRequest(
      props: CreatePullRequestProps
    ): Promise<PullRequest> {
      // https://docs.github.com/en/rest/reference/pulls#create-a-pull-request
    }

    async createFile(props: CreateFileProps): Promise<CreateFileResult> {}
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
    name: string;
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
