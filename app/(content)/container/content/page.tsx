import { fieldTypeEnum } from "@/schema";
import Link from 'next/link';

const ContentPage = () => {

    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-4 h-45 p-4">
            {fieldTypeEnum?.enumValues?.map((m, idx: number) => (
                <Link href={`content/${m.toLocaleLowerCase()}`} key={idx} className="bg-muted/50 aspect-video rounded-xl flex justify-center items-center">
                    {m.toLocaleLowerCase()}
                </Link>
            ))}
        </div>
    )
}

export default ContentPage;