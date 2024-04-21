import React, { FC } from 'react';
import Image from 'next/image';
import backgroundImg from '../../../assets/img/socialBanner.jpg';
import googleIcon from '../../../assets/svg/googleIcon.svg';
import facebookIcon from '../../../assets/svg/facebookIcon.svg';
import linkedinIcon from '../../../assets/svg/linkedinIcon.svg';
import SignupForm from '@/components/SignupFrom';
import Link from 'next/link';

interface pageProps {}

const SignUp: FC<pageProps> = ({}) => {
  return (
    <section className="min-h-screen mt-0  transition-all duration-200 ease-soft-in-out">
      <div
        className="relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-center bg-cover min-h-50-screen rounded-xl"
        style={{
          backgroundImage: `url(${backgroundImg.src})`,
        }}
      >
        <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-60"></span>
        <div className="container z-10">
          <div className="flex flex-wrap justify-center -mx-3">
            <div className="w-full max-w-full px-3 mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:w-6/12">
              <h1 className="mt-12 mb-2 text-white">Welcome!</h1>
              <p className="text-white">
                Ready to revolutionize your social media strategy?
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
          <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
            <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                <h5>Register with</h5>
              </div>
              <div className="flex flex-wrap px-3 -mx-3 sm:px-6 xl:px-12">
                <div className="w-3/12 max-w-full px-1 ml-auto flex-0">
                  <Link
                    className="flex items-center justify-center w-full px-6 py-3 mb-4 text-xs font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75"
                    href="/api/auth/facebook"
                  >
                    <Image priority src={facebookIcon} alt="facebook signup" />
                  </Link>
                </div>
                <div className="w-3/12 max-w-full px-1 flex-0">
                  <Link
                    className="flex items-center justify-center w-full px-6 py-3 mb-4 text-xs font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75"
                    href="/api/auth/google"
                  >
                    <Image priority src={googleIcon} alt="google signup" />
                  </Link>
                </div>
                <div className="w-3/12 max-w-full px-1 mr-auto flex-0">
                  <Link
                    className="flex items-center justify-center w-full px-6 py-3 mb-4 text-xs font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75"
                    href="/api/auth/linkedin"
                  >
                    <Image priority src={linkedinIcon} alt="linkedIn signup" />
                  </Link>
                </div>
              </div>
              <div className="relative w-full max-w-full text-center shrink-0">
                <hr className=" flex-shrink-0 border-t border-r border-l border-transparent h-0.5  border-b-0 opacity-25 bg-gradient-to-r from-transparent via-slate-400 to-transparent" />

                <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 inline px-4 mb-2 text-sm font-semibold leading-normal bg-white text-slate-400">
                  or
                </p>
              </div>
              <div className="flex-auto p-6">
                <SignupForm />
                <p className="mt-4 mb-0 text-sm leading-normal">
                  Already have an account?{' '}
                  <Link href="/signin" className="font-bold text-slate-700">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;