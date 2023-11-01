import Accordion from '@/components/Disclosure';
import DaySlider from '@/components/Sliders/DaySlider';
import { fixtures } from '@/types/fixturesTypes';
import { ClockIcon, SearchIcon } from '@/utils/icons';

import dayjs from 'dayjs';
import localeFa from 'dayjs/locale/fa';
import type { EmblaOptionsType } from 'embla-carousel-react';
import jalaliday from 'jalaliday';

import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

const OPTIONS: EmblaOptionsType = {
  direction: 'rtl',
  align: 'start',
  dragFree: true,
  containScroll: 'trimSnaps',
};

function getAllDatesForCurrentYear() {
  dayjs.locale(localeFa);
  dayjs.extend(jalaliday);
  // Get the current date in the Persian locale
  const today = dayjs().locale('fa');

  // Start from the first day of the year
  const startDate = today.startOf('year');

  // End at the last day of the year
  const endDate = today.endOf('year');

  // Initialize an array to store the date objects
  const dateObjects = [];

  // Loop through the dates, starting from the first day of the year
  let currentDate = startDate;
  while (
    currentDate.isSame(endDate, 'day') ||
    currentDate.isBefore(endDate, 'day')
  ) {
    // Create a date object with 'YYYY-MM-DD' format
    const dateObject = {
      date: currentDate.format('YYYY-MM-DD'),
      title: currentDate
        .calendar('jalali')
        .format('DD MMMM')
        .replace(/\d+/g, (digit) => {
          return Number(digit).toLocaleString('fa-IR', {
            useGrouping: false,
          });
        }),
    };

    const isToday = currentDate.isSame(today, 'day');
    const isTomorrow = currentDate.isSame(today.add(1, 'day'), 'day');
    const isYesterday = currentDate.isSame(today.subtract(1, 'day'), 'day');
    const isCurrentWeek = currentDate.isSame(today, 'week');

    // Add a title based on the current date
    if (isToday) {
      dateObject.title = 'امروز';
    } else if (isYesterday) {
      dateObject.title = 'دیروز';
    } else if (isTomorrow) {
      dateObject.title = 'فردا';
    } else if (isCurrentWeek) {
      dateObject.title = currentDate.format('dddd');
    }

    // Push the date object to the array
    dateObjects.push(dateObject);

    // Move to the next day
    currentDate = currentDate.add(1, 'day');
  }

  return dateObjects;
}
const dateObjects = getAllDatesForCurrentYear();

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get('date');
  try {
    const req = await fetch(
      `https://core-sport-api.zarebin.ir/api/football/fixtures/?date=${
        q ?? new Date().toISOString().slice(0, 10)
      }`
    );
    const result = await req.json();
    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

function Matches() {
  const { result } = useLoaderData() as { result: fixtures };

  if (!result) {
    return <h1>ایتمی وجود ندارد</h1>;
  }

  return (
    <section className="no-scrollbar  overflow-y-auto overflow-x-hidden">
      <header className="sticky top-0 z-10 rounded-t-md bg-white p-4  pb-0 pl-0">
        <div className="mb-5  flex items-center justify-between pl-4">
          <h1 className="text-xl font-bold">نتایج زنده</h1>
          <ClockIcon />
        </div>
        <div className="relative pl-4">
          <input
            type="text"
            placeholder="جستجو..."
            className="w-full  rounded-md bg-[#f5f6fb] py-2.5 pr-8  text-sm outline-none "
          />
          <span className="absolute right-1 top-1/2  -translate-y-1/2 ">
            <SearchIcon />
          </span>
        </div>
        <nav className="bg-white p-6 pb-0 pl-0">
          <DaySlider
            OPTIONS={OPTIONS}
            defaultIndex={dateObjects.findIndex((day) => day.title === 'امروز')}
          >
            {(onClick) => (
              <div className="grid   grid-flow-col gap-x-6 [grid-auto-columns:16%]">
                {dateObjects.map((date) => (
                  <Link
                    to={{ search: `date=${date.date}` }}
                    onClick={() => {
                      onClick(
                        dateObjects.findIndex((day) => day.title === date.title)
                      );
                    }}
                    className="flex h-6 items-center justify-center rounded-md pb-8 pt-2  font-bold  text-[#a1a1aa] transition-colors duration-200 before:absolute  before:top-[2rem] before:h-2 before:w-12   before:rounded-t-lg before:bg-[#569738] before:transition-all before:duration-200 before:ease-in-out before:content-[''] hover:text-[#1c1c1e] [&.is-snapped]:text-[#1c1c1c] [&:not(.is-snapped)]:before:opacity-0 "
                    key={date.date}
                  >
                    {date.title}
                  </Link>
                ))}
              </div>
            )}
          </DaySlider>
        </nav>
      </header>

      <main className="  flex flex-col  gap-4 p-4">
        {result.all?.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <h1 className="text-xl font-bold">رویدادی وجود ندارد</h1>
          </div>
        )}
        {result.all?.map((item) => (
          <Accordion
            key={item.id}
            league={item.name}
            leagueLogo={item.logo}
            fixtures={item.fixtures}
          />
        ))}
      </main>
    </section>
  );
}

export default Matches;
