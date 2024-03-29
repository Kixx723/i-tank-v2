"use client";

import React from "react";
import { Junction, ModalProps } from "@/interfaces";
import Draggable from "react-draggable";

const JunctionModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  junction,
  onUpdate,
}) => {
  if (!isOpen || !junction) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const updatedData: Partial<Junction> = {
      elevation: parseFloat(form.elevation.value),
      demand: parseFloat(form.demand.value),
      demandPattern: form.demandPattern.value,
    };
    onUpdate(junction.id, updatedData);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Draggable>
        <div className="fixed top-20 right-20 z-[1000] w-96 shadow-lg bg-white rounded-lg p-4">
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Junction Data
          </h2>
          <div className="space-y-3">
            <div className="relative z-0 w-full mb-5 group">
              <input
                defaultValue={junction.nodeId}
                readOnly
                type="text"
                name="id"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="id"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                ID
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                required
                defaultValue={
                  junction ? junction.elevation?.toFixed(2) : "0.00"
                }
                type="text"
                name="elevation"
                pattern="^\d*(\.\d{0,2})?$"
                onBlur={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    e.target.value = value.toFixed(2);
                  }
                }}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="elevation"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Elevation
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                required
                defaultValue={junction ? junction.demand?.toFixed(2) : "0.00"}
                type="text"
                name="demand"
                pattern="^\d*(\.\d{0,2})?$"
                onBlur={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    e.target.value = value.toFixed(2);
                  }
                }}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="demand"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Demand
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                defaultValue={junction ? junction.demandPattern : "0.00"}
                type="text"
                name="demandPattern"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="demandPattern"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Demand Pattern
              </label>
            </div>
            <button
              type="submit"
              className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
            >
              Update
            </button>
          </div>
        </div>
      </Draggable>
    </form>
  );
};

export default JunctionModal;

//   <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
//   <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-2xl border border-gray-200">
//     <form onSubmit={handleSubmit} className="space-y-6">
//     <div>
//         <label htmlFor="id" className="block text-sm font-medium text-gray-700">Id</label>
//         <input
//           name="id"
//           readOnly
//           defaultValue={junction.nodeId}
//           type="text"
//           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
//         />
//       </div>
//       <div>
//         <label htmlFor="elevation" className="block text-sm font-medium text-gray-700">Elevation</label>
//         <input
//           required
//           name="elevation"
//           defaultValue={junction ? junction.elevation?.toFixed(2) : '0.00'}
//           type="text"
//           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
//           placeholder="Elevation"
//           pattern="^\d*(\.\d{0,2})?$"
//           title="Please enter a valid number with up to two decimal places."
//           onBlur={(e) => {
//             const value = parseFloat(e.target.value);
//             if (!isNaN(value)) {
//               e.target.value = value.toFixed(2);
//             }
//           }}
//         />
//       </div>
//       <div>
//         <label htmlFor="demand" className="block text-sm font-medium text-gray-700">Demand</label>
//         <input
//           required
//           name="demand"
//           defaultValue={junction ? junction.demand?.toFixed(2) : '0.00'}
//           type="text"
//           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
//           placeholder="Demand"
//           pattern="^\d*(\.\d{0,2})?$"
//           title="Please enter a valid number with up to two decimal places."
//           onBlur={(e) => {
//             const value = parseFloat(e.target.value);
//             if (!isNaN(value)) {
//               e.target.value = value.toFixed(2);
//             }
//           }}
//         />
//       </div>
//       <div>
//         <label htmlFor="demandPattern" className="block text-sm font-medium text-gray-700">Demand Pattern</label>
//         <input
//           name="demandPattern"
//           defaultValue={junction ? junction.demandPattern : '0.00'}
//           type="text"
//           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
//           placeholder="Demand Pattern"
//         />
//       </div>
//       <div className="flex justify-end space-x-2">
//         <button
//           type="button"
//           onClick={onClose}
//           className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//         >
//           Close
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//         >
//           Update Junction
//         </button>
//       </div>
//     </form>
//   </div>
// </div>
