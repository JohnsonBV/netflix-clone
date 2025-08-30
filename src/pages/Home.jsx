import Banner from '../components/Banner'
import Row from '../components/Row'
import { fetchTopRated, fetchTrending, fetchByGenre } from '../api/requests'

export default function Home() {
  return (
    <div className="container">
      <Banner />
      <Row title="Trending Now" query={fetchTrending} />
      <Row title="Top Rated" query={fetchTopRated} />
      <Row title="Action" query={() => fetchByGenre(28)} />
      <Row title="Comedy" query={() => fetchByGenre(35)} />
      <Row title="Horror" query={() => fetchByGenre(27)} />
      <Row title="Romance" query={() => fetchByGenre(10749)} />
    </div>
  )
}
