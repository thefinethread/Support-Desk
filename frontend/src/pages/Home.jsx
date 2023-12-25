import { Link } from 'react-router-dom';
import Container from '../components/common/Container';
import Button from '../components/common/Button';

const Home = () => {
  return (
    <main className="flex-1 z-10 flex flex-col justify-center text-[15px]">
      <Container>
        <div className="h-full text-center max-w-lg m-auto py-8">
          <header className="mb-10">
            <h1 className="flex justify-center items-center font-bold gap-2 text-3xl mb-4">
              What do you need help with?
            </h1>
            <h3 className="font-bold text-gray-400 text-2xl">
              Please choose from an option below
            </h3>
          </header>
          <section className="px-6">
            <Link to="new-ticket">
              <Button version="secondary" className="mb-4">
                Create New Ticket
              </Button>
            </Link>
            <Link to="/tickets">
              <Button>View My Tickets</Button>
            </Link>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default Home;
