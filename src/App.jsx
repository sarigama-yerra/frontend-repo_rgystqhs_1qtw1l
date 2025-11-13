import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products`)
        if (!res.ok) throw new Error('Failed to load products')
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const seed = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/seed`, { method: 'POST' })
      if (!res.ok) throw new Error('Failed to seed')
      await new Promise(r => setTimeout(r, 400))
      const list = await fetch(`${API_BASE}/api/products`)
      setProducts(await list.json())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navbar */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-black" />
            <span className="font-semibold tracking-wide">Your Brand</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-black">New</a>
            <a href="#" className="hover:text-black">Men</a>
            <a href="#" className="hover:text-black">Women</a>
            <a href="#" className="hover:text-black">About</a>
          </nav>
          <a href="/test" className="text-sm text-gray-600 hover:text-black">System</a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Elevate your everyday essentials</h1>
          <p className="mt-4 text-gray-600">Minimal silhouettes. Premium fabrics. Designed for comfort and built to last.</p>
          <div className="mt-6 flex gap-3">
            <a href="#shop" className="px-5 py-3 bg-black text-white rounded-md">Shop now</a>
            <a href="#story" className="px-5 py-3 border rounded-md">Our story</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-[3/4] rounded-xl bg-gray-200 overflow-hidden">
            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop" alt="Look 1" />
          </div>
          <div className="aspect-[3/4] rounded-xl bg-gray-200 overflow-hidden mt-8">
            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=1200&auto=format&fit=crop" alt="Look 2" />
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="shop" className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-semibold">Featured products</h2>
          <div className="text-sm text-gray-600">
            {loading ? 'Loading…' : `${products.length} items`}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 border border-red-200 bg-red-50 text-red-700 rounded">
            {error}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center p-10 border rounded bg-white">
            <p className="text-gray-700">No products yet.</p>
            <button onClick={seed} className="mt-4 px-4 py-2 bg-black text-white rounded">Seed demo products</button>
          </div>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="group rounded-xl overflow-hidden bg-white border hover:shadow-md transition">
              <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                <img src={p.image || 'https://images.unsplash.com/photo-1520975922131-c0f3c0b1c1a9?q=80&w=800&auto=format&fit=crop'} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{p.title}</h3>
                  <span className="font-semibold">${p.price}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{p.description}</p>
                <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                  <span className="capitalize">{p.category}</span>
                  <button className="px-3 py-1 bg-black text-white rounded">Add to cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-8 text-sm text-gray-600">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-black" />
              <span className="font-semibold">Your Brand</span>
            </div>
            <p className="mt-4">Timeless staples crafted responsibly.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Shop</h4>
            <ul className="mt-3 space-y-2">
              <li><a className="hover:text-black" href="#">Tops</a></li>
              <li><a className="hover:text-black" href="#">Bottoms</a></li>
              <li><a className="hover:text-black" href="#">Outerwear</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Company</h4>
            <ul className="mt-3 space-y-2">
              <li><a className="hover:text-black" href="#story">Our story</a></li>
              <li><a className="hover:text-black" href="#">Sustainability</a></li>
              <li><a className="hover:text-black" href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 pb-8">© {new Date().getFullYear()} Your Brand. All rights reserved.</div>
      </footer>
    </div>
  )
}

export default App
