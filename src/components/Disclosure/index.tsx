import { FixturesEntity } from '@/types/fixturesTypes';
import { classNames } from '@/utils/helpers';
import { ChevronUpIcon } from '@/utils/icons';
import { Disclosure } from '@headlessui/react';

type Props = {
  fixtures: FixturesEntity[] | null | undefined;
  leagueLogo: string;
  league: string;
};

export default function Accordion({ league, leagueLogo, fixtures }: Props) {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className={classNames('rounded-md bg-white ', open ? 'pb-4' : '')}>
          <Disclosure.Button
            className={classNames(
              'flex  w-full items-center justify-between px-4 py-6',
              open ? 'border-b-2 border-solid border-[#f3f3f4]' : 'border-none'
            )}
          >
            <div className="flex items-center  justify-center gap-2">
              <img
                src={leagueLogo}
                width={26}
                height={26}
                className="rounded-md"
                alt={league}
              />
              <span className="text-sm font-bold text-[#003ec1]">{league}</span>
            </div>
            <ChevronUpIcon
              className={classNames(
                'ml-2 h-5 w-5  transform transition-transform duration-200',
                open ? '' : '-rotate-180'
              )}
            />
          </Disclosure.Button>

          <Disclosure.Panel>
            {fixtures?.map((fixture) => (
              <div
                className={classNames(
                  'flex  w-full items-center gap-6 p-4 font-medium',
                  open
                    ? 'border-b border-solid border-[#f3f3f4]'
                    : 'border-none'
                )}
                key={fixture.id}
              >
                <div className="flex flex-1  items-center justify-between">
                  {fixture.home.name}
                  <img
                    src={fixture.home.logo}
                    width={32}
                    height={32}
                    className="rounded-md"
                    alt={fixture.home.name}
                  />
                </div>
                {fixture.elapsed ? (
                  <span>
                    {fixture.home_goals} - {fixture.away_goals}
                  </span>
                ) : (
                  <span className="">
                    {new Date(fixture.start_time).toLocaleTimeString('fa-IR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                )}
                <div className="flex  flex-1 items-center gap-2">
                  <img
                    src={fixture.away.logo}
                    width={32}
                    height={32}
                    className="rounded-md"
                    alt={fixture.away.name}
                  />
                  {fixture.away.name}
                </div>
              </div>
            ))}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
