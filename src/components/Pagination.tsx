import Link from "next/link";

type Props = {
  root: string;
  seperator: string;
  page: number;
  total: number;
  perPage: number;
};

export default function Pagination({ root, seperator, page, total, perPage }: Props) {
  let totalPages = Math.ceil(total / perPage);
  let paginator = new Array(totalPages)
    .fill(null)
    .map((_, i) => (i === 0 ? root : `${root}/${seperator}/${i + 1}`));
  let start = ((page - 1) * perPage) + 1;
  let end = ((page - 1) * perPage) + perPage;

  let previous = (page > 1)
    ? paginator[page-2]
    : false;

  let next = (page != totalPages)
    ? paginator[page]
    : false;

  if (end > total) {
    end = total;
  }
  return (
    <nav className="flex items-center justify-between border-t-2 border-primary">
      <div className="py-4">
        <p className="text-sm leading-5">
          Showing&nbsp;
          <span className="font-bold">{ start }</span>
          &nbsp;to&nbsp;
          <span className="font-bold">{ end }</span>
          &nbsp;of&nbsp;
          <span className="font-bold">{ total }</span>
          &nbsp;results&nbsp;
        </p>
      </div>
      <div>
        <ol className="flex">
          {previous && (
            <li key="pagination_previous" className="flex border-t-2 border-transparent">
              <Link href={previous} as={previous}>
                <a className="py-4 px-2" aria-label="Previous">
                  &laquo;
                </a>
              </Link>
            </li>
          )}

          {paginator.map((href, i) => (
            (i + 1) === page ? (
              <li key={`pagination_${i}`} className="flex border-t-2 border-border-active">
                <span className="py-4 px-2">
                  {i + 1}
                </span>
              </li>
            ) : (
              <li key={`pagination_${i}`} className="flex border-t-2 border-transparent">
                <Link href={href} as={href}>
                  <a className="py-4 px-2">
                    {i + 1}
                  </a>
                </Link>
              </li>
            )
          ))}

          {next && (
            <li key="pagination_next" className="flex border-t-2 border-transparent">
              <Link href={next} as={next}>
                <a className="py-4 px-2" aria-label="Next">
                  &raquo;
                </a>
              </Link>
            </li>
          )}
        </ol>
      </div>
    </nav>
  );
}
