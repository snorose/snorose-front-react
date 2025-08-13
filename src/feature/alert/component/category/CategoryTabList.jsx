import CategoryTab from '@/feature/alert/component/category/CategoryTab';

const list = [];

export default function CategoryTabList() {
  return (
    <div>
      {list.map((item) => (
        <CategoryTab name={item} />
      ))}
    </div>
  );
}
