import { useEffect, useState } from 'react'
import { thumbBase } from '../api/requests'

export default function Row({ title, query }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const { data } = await query()
        setItems(data.results || [])
      } catch (e) {
        console.error(e)
      }
    })()
  }, [query])

  return (
    <section className="row">
      <h3>{title}</h3>
      <div className="row-posters">
        {items.map((m) => (
          <img
            key={m.id}
            className="poster"
            alt={m.name || m.title}
            src={
              m.poster_path
                ? `${thumbBase}${m.poster_path}`
                : 'https://via.placeholder.com/300x450?text=No+Image'
            }
          />
        ))}
      </div>
    </section>
  )
}
