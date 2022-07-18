import React from 'react'


export default function LoginPage() {
   return (
    <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left mb-4">
                <h1 className="text-5xl font-bold">LOGIN TO SCREAMER</h1>
            </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
            <div className="form-control">
            <label className="label">
                <span className="label-text">EMAIL</span>
            </label>
            <input type="text" placeholder="EMAIL" className="input input-bordered" />
            </div>
            <div className="form-control">
            <label className="label">
                <span className="label-text">PASSWORD</span>
            </label>
            <input type="text" placeholder="PASSWORD" className="input input-bordered" />
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
            </div>
        </div>
        </div>
        </div>
    </div>
   ) 
}