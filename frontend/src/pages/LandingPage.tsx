import { Link } from 'react-router-dom'

export const LandingPage = () => {
  return (
    <div className='bg-slate-50 min-h-screen'>
      {/* Header Section */}
      <div className='text-center py-16'>
        <h1 className='text-5xl font-bold text-gray-800'>
          Discover Inspiring Stories, Ideas, and Perspectives
        </h1>
        <p className='text-xl text-gray-600 mt-6'>
          Join a community of passionate writers and readers. Explore articles that spark curiosity and fuel your creativity.
        </p>
        <div className='mt-8'>
          <Link to="/signup">
            <button className="text-white bg-gray-800 hover:bg-gray-700 font-medium rounded-md text-lg px-6 py-3">Start Reading</button>
          </Link>
        </div>
      </div>

      {/* Why Join Us Section */}
      <div className='py-16'>
        <h2 className='text-3xl font-semibold text-center text-gray-800'>Why Join Us?</h2>
        <div className='flex justify-center gap-8 mt-10'>
          <div className='w-1/4 p-6 border rounded-md bg-slate-100'>
            <h3 className='text-xl font-medium text-gray-700'>Express Freely</h3>
            <p className='text-gray-500 mt-2'>Share your thoughts and stories with a global audience.</p>
          </div>
          <div className='w-1/4 p-6 border rounded-md bg-slate-100'>
            <h3 className='text-xl font-medium text-gray-700'>Read Without Limits</h3>
            <p className='text-gray-500 mt-2'>Explore articles across technology, lifestyle, and more.</p>
          </div>
          <div className='w-1/4 p-6 border rounded-md bg-slate-100'>
            <h3 className='text-xl font-medium text-gray-700'>Engage & Connect</h3>
            <p className='text-gray-500 mt-2'>Comment, discuss, and connect with like-minded individuals.</p>
          </div>
        </div>
      </div>

      {/* Join Section */}
      <div className='py-16 text-center'>
        <h2 className='text-3xl font-semibold text-gray-800'>Join Our Global Community</h2>
        <p className='text-gray-600 mt-4'>Over 100,000 writers and readers from around the world are already here. Become part of the conversation!</p>
        <div className='mt-8'>
          <Link to="/signup">
            <button className="text-white bg-gray-800 hover:bg-gray-700 font-medium rounded-md text-lg px-6 py-3">Sign Up for Free</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
