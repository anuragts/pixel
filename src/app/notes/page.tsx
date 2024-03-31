import NotesGallery from "@/components/ui/NotesGallery"
import CreateNote from "@/components/ui/CreateNote"

export default function page() {
  return (
    <div>
        <div>
            <NotesGallery />
            <CreateNote />
        </div>
    </div>
  )
}
