import TextAvatar from "@/app/components/TextAvatar";

type SubjectListProps = {
  sectionTitle: string;
  items: ISubjectItem[];
};

const SubjectList: React.FC<SubjectListProps> = ({
  sectionTitle,
  items = [],
}) => {
  return (
    <section className="">
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-foreground text-sm">
            {sectionTitle}
          </span>
          <span className="text-xs text-link font-bold ">View all</span>
        </div>
        <div className="flex flex-nowrap overflow-x-scroll  gap-x-3">
          {items.map((item) => {
            return (
              <div className="flex flex-col gap-y-2 shrink-0 border border-foreground-secondary rounded-lg w-6/12 px-2 pt-2 h-32">
                <TextAvatar
                  character={item.title.substring(0, 1)}
                  bgColor="orange"
                />
                <span className="text-sm truncate ">{item.title}</span>
                <span className="text-[0.85rem] text-foreground-secondary truncate-2-lines max-w-xs">
                  {item.description}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SubjectList;
