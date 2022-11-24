import React from 'react'

const Page404 = () => {
  return (
    <div className="bg-white min-h-screen flex flex-row items-center">
      <div className="layout">
        <div className="justify-center">
          <div>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">Oops! You{"'"}re lost.</h4>
              <p className="text-medium-emphasis float-start">
                The page you are looking for was not found.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page404
