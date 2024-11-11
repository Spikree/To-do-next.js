import Navbar from "@/components/Navbar"
import Task from "@/components/Task"

const Home = () => {
  return (
    <div className="w-full px-10 min-h-max">
      <Navbar/>
      <Task/>
    </div>
  )
}

export default Home