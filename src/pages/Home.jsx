import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to BookSummary</h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover and read summaries of your favorite books
        </p>
        <Link
          to="/books"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Explore Books
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-8 mt-16">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-xl font-bold mb-2">Thousands of Books</h3>
          <p className="text-gray-600">Browse our vast collection of book summaries</p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-bold mb-2">Quick Summaries</h3>
          <p className="text-gray-600">Get the essence of books in minutes</p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-bold mb-2">Easy Search</h3>
          <p className="text-gray-600">Find books by title, author, or genre</p>
        </div>
      </div>
    </div>
  )
}

export default Home

