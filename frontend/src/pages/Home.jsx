import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import Button from "../components/common/Button";

const Home = () => {
  return (
    <main className="z-10 flex flex-1 flex-col justify-center text-[15px]">
      <Container>
        <div className="m-auto h-full max-w-lg py-8 text-center">
          <header className="mb-10">
            <h1 className="mb-4 flex items-center justify-center gap-2 text-3xl font-bold">
              What do you need help with?
            </h1>
            <h3 className="text-2xl font-bold text-gray-400">
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
