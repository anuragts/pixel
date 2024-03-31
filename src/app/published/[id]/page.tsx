import Struc from "./components/Struc"

export default function Page({ params }: { params: { id: number } }) {
    const id = params.id;

    return (
    <div>
        <Struc id={id}/>
    </div>
  )
}
