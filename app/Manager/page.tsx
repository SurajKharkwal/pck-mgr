import { createTable } from "../db/sql-query/create"


export default async function fat() {
  const result = await createTable("worker-pkm")
  return <div>{String(result)}</div>
}
