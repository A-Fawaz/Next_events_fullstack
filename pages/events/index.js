import { Fragment } from 'react';
import EventList from '../../components/events/event-list'
import EventSearch from '../../components/events/event-search';
import { getAllEvents } from '../../helpers/api-utils';
import { useRouter } from 'next/router';
import Head from 'next/head';
function AllEventsPage(props) {
  const router = useRouter()
  const { events } = props;
  function findEventHandler(year, month){
    const fullPath = `events/${year}/${month}`;
    router.push(fullPath)

  }
  return (
    <Fragment>
      <Head>
            <title>All Events</title>
            <meta name="description"
            content="Find a lot  of great events that allow you to evolve..."
            />
        </Head>
      <EventSearch onSearch={findEventHandler}/>
      <EventList items={events}/>
    </Fragment>
  );
}
export async function getStaticProps() {
  const events = await getAllEvents();
  return {
      props: {
          events: events
      },
      revalidate: 60
  }
}

export default AllEventsPage;
