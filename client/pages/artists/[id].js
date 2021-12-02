import { useRouter } from "next/router";

export default function Artists() {
  const router = useRouter();
    return (<div>{router.query.id}</div>);
}
