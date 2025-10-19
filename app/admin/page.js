import Link from 'next/link';
import FirestorePopulator from '../components/FirestorePopulator';

export default function AdminPage() {
  return (
    <div className='min-h-screen bg-primary-900 py-20'>
      <div className='container mx-auto px-6'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl md:text-4xl font-heading font-bold text-gray-100 mb-4'>
            🔧 Portfolio <span className='text-accent-500'>Admin</span>
          </h1>
          <p className='text-lg text-gray-400'>
            Database management tools for your portfolio
          </p>
        </div>

        <FirestorePopulator />

        <div className='mt-8 text-center'>
          <Link
            href='/'
            className='inline-flex items-center px-6 py-3 bg-transparent border-2 border-accent-500 text-accent-500 rounded-lg font-mono transition-all duration-300 hover:bg-accent-500 hover:text-primary-900'
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
