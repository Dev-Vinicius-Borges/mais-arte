import EventCard from "../cards/events";
import GoTo from "../go-to";

export default function UpcomingEvents(){
    return (
        <section className={``}>
            <div className="flex justify-between w-full mb-8">
                <p className={`text-2xl text-neutral-100`}>Próximos eventos</p>
                <GoTo pathUrl={`/eventos`} text={`Ver mais`} />
            </div>
            <section className={`grid grid-cols-4 gap-8`}>
                <EventCard date={new Date(2026, 8, 10)} local="Local X" imageUrl="https://picsum.photos/200/100" title="Lorem ipsum" key={0}/>
                <EventCard date={new Date(2026, 8, 10)} local="Local X" imageUrl="https://picsum.photos/200/100" title="Lorem ipsum" key={1}/>
                <EventCard date={new Date(2026, 8, 10)} local="Local X" imageUrl="https://picsum.photos/200/100" title="Lorem ipsum" key={2}/>
                <EventCard date={new Date(2026, 8, 10)} local="Local X" imageUrl="https://picsum.photos/200/100" title="Lorem ipsum" key={3}/>
            </section>
        </section>
    );
}