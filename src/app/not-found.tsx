import React from "react";

export default function Custom404() {
	return (
		<div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
			<div className="relative">
				<h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
				<div className="bg-orange-400base text-white p-2 text-sm rounded rotate-12 absolute bottom-[20%] left-[25%] ">
					Page non trouvée
				</div>
			</div>

			<button className="mt-5">
				<div className="relative inline-block text-sm font-medium text-orange-500 group active:text-orange-500 focus:outline-none focus:ring">
					<span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-orange-500 group-hover:translate-y-0 group-hover:translate-x-0"></span>

					<span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
						<a className="text-extra-medium" href="/">
							Revenir en lieu sûr
						</a>
					</span>
				</div>
			</button>
		</div>
	);
}