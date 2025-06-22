import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


async function GalleryPage() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(session && session?.user?.role === 'admin') redirect('/')
    return (  
        <div>galary page</div>
    );
}

export default GalleryPage;