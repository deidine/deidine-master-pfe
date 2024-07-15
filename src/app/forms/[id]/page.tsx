import Designer from "@/components/dashboard/Designer";
import {
  GetFormById
} from "@/utils/utilsFunctions";

export default function FormDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const form = GetFormById(Number(id));
  if (!form) {
    throw new Error("form not found");
  }
  return (
    <> 
      <Designer form={form} />
    </>
  );
}
