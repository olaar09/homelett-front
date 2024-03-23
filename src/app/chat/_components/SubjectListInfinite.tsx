import TextAvatar from "@/app/components/TextAvatar";

type SubjectListInfiniteProps = {
  sectionTitle?: string;
  items: ISubjectItem[];
};

const SubjectListInfinite: React.FC<SubjectListInfiniteProps> = ({
  sectionTitle,
  items = [],
}) => {
  return (
    <section className="">
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between px-3">
          {sectionTitle && (
            <span className="font-bold text-foreground text-sm">
              {sectionTitle}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-y-5">
          {items.map((item, index) => {
            return (
              <div className="w-6/12 px-3">
                <div
                  key={index}
                  className="flex flex-col gap-y-2 shrink-0 border border-foreground-secondary rounded-lg  px-2 pt-2 h-32"
                >
                  <TextAvatar
                    character={item.title.substring(0, 1)}
                    bgColor="orange"
                  />
                  <span className="text-sm truncate ">{item.title}</span>
                  <span className="text-[0.85rem] text-foreground-secondary truncate-2-lines max-w-xs">
                    {item.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SubjectListInfinite;
