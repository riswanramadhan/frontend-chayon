import { Input } from './input'
import { Button } from './button'

export function Newsletter() {
  return (
    <div className="bg-white py-16 px-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">Stay up to date!</h2>
            <p className="text-gray-600">Subscribe to our newsletter to get inbox notifications.</p>
          </div>
          <div className="mt-6 md:mt-0 flex w-full md:w-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="rounded-r-none border-r-0 focus:ring-blue-600 w-full md:w-64" 
            />
            <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}