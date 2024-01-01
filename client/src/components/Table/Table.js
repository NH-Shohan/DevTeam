import Image from 'next/image';

export default function Table({ columns, data }) {
  return (
    <div class="flex flex-col overflow-auto scrollbar scrollbar-track-primary scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-h-[6px]">
      <div class="sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full text-left text-sm font-light table-auto">
              <thead class="border-b small-bold border-blue">
                <tr>
                  {columns.map((column, index) => (
                    <th key={index} scope="col" class="px-6 py-1">
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    class="border-b transition duration-200 ease-in-out hover:bg-[#3333bd16] border-blue"
                  >
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} class="whitespace-nowrap px-6 py-4">
                        {column.key !== 'imageLink' ? (
                          row[column.key]
                        ) : (
                          <div
                            className={`relative rounded-full overflow-hidden h-16 w-16`}
                          >
                            <Image
                              src={row[column.key]}
                              alt={row[column.key]}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-full"
                            />
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
