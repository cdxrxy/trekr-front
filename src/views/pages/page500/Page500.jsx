import React from 'react'

const Page500 = () => {
  return (
    <div className="bg-white min-h-screen flex flex-row items-center">
      <div className="layout">
        <div className="justify-center">
          <div>
            <span className="clearfix">
              <h1 className="float-start display-3 me-4">500</h1>
              <h4 className="pt-3">Houston, we have a problem!</h4>
              <p className="text-medium-emphasis float-start">
                The page you are looking for is temporarily unavailable.
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page500
