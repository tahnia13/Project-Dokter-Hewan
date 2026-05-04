import ErrorPage from "../components/ErrorPage";

export default function NotFound() {
  return <ErrorPage kodeError="404" deskripsiError="Halaman yang Anda cari tidak ditemukan." />;
}