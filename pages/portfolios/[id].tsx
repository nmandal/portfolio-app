import React from 'react';
import Link from 'next/link';

import HighchartsReact from 'highcharts-react-official';
import Highcharts from "highcharts/highstock";

const SingleAllocation = ({ allocationItem }) => {

  let portfolio = allocationItem.portfolio
  portfolio.map((p,idx) => {
    console.log(p, idx)
  })

  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'My chart'
    },
    series: [{
      name: 'Funds',
      data: allocationItem.portfolio.map(p => p.shares)
    }]
  };

  return (
    <>
    <div className="prose prose-blue text-white mx-auto">
      <Link href="/">
        <a>Go back</a>
      </Link>
    </div>
    {/* TODO asset class */}
    <main className="h-screen">
        <div className="container mx-auto max-w-screen-lg px-4">
          <h1 className="text-3xl mb-5 font-bold tracking-wide text-white">
          {allocationItem.date} - ${allocationItem.total.toLocaleString()}
          </h1>
          
          <section className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-800 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-800 ">
                    <thead className="bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Symbol
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Shares
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Value ($)
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                         Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-700 divide-y divide-gray-500">
                      {allocationItem.portfolio.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                            {item.symbol}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {item.shares}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white truncate">
                              {/* {item.message} */}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap capitalize">
                            Edit  Delete
                              {/* {item.feedbackType.toLowerCase()} */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className='mt-10'>
            <HighchartsReact highcharts={Highcharts} options={options} />

            </div>
          </section>
        </div>
      </main>


    </>
  );
};

export default SingleAllocation;

export const getServerSideProps = async (context) => {
  const id = context.params.id;

  const allocationItem =   {
    id: 'bdac3e8f-4196-40de-b79b-d8a24525a277',
    date: '2020-03-15',
    total: 10000,
    portfolio: [
      {
        "symbol": "VTI",
        "shares": 4
      },
      {
        "symbol": "BNDX",
        "shares": 50
      },
      {
        "symbol": "VNQ",
        "shares": 25
      }
    ]
  }

  return {
    props: {
      allocationItem
    },
  };
};
