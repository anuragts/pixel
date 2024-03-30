import Editor from "@/components/ui/Editor";

export default function Page({ params }: { params: { id: number } }) {
    return(
        <>
        <div>
            <Editor id={params.id} />
        </div>
        </>
    )
}
