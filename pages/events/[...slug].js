import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import Head from "next/head";
function FilteredEventsPage(props) {
  const router = useRouter();

  // const filterData = router.query.slug;

  // if(!filterData) {
  //   return <p className="center">Loading...</p>;
  // }

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

 const pageHeadData =( <Head>
 <title>Filtered Events</title>
 <meta
   name="description"
   content={`All events for ${props.date.month}/${props.date.year}.`}
 />
</Head> 
 );

  if (props.hasError) {
    return (
      <>
      {pageHeadData}
        <ErrorAlert>
          <p>Invalid Filter. Please adjust your values! </p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  const filteredEvents = props.events;
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
      {pageHeadData}

        <ErrorAlert>
          <p>No events were found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  // console.log(filterData);

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <>
      {pageHeadData}
      
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
      // notFound: true,
      // redirect: {
      //   destination: '/error'
      // }
    };
  }
  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  return {
    props: {
      events: filteredEvents,

      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}

export default FilteredEventsPage;
