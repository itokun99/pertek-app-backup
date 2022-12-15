import ActionButton from "@components/buttons/ActionButton";
import { MyAnimatedButtonProps } from "@components/buttons/AnimatedButton";
import Confirmation from "@components/dialog/Confirmation";
import FormFacilityAsisten from "@components/dialog/ModalFacilityAsisten/FormFacilityAsisten";
import { TabItem } from "@components/TabBar";
import Section from "@components/views/Section";
import useConfirmation from "@hooks/useConfirmation";
import { Add } from "@mui/icons-material";
import { IFacilityAssistant } from "@types";
import dynamic from "next/dynamic";
import { ReactElement, Suspense, useMemo } from "react";
import useFacilityAssistant from "./hooks/useFacilityAssistant";

const TableFacilityAssistantView = dynamic(
  () => import("@components/tables/TableFacilityAssistant"),
  {
    ssr: false,
    suspense: true,
  }
);

const FacilityAssitantView = (): ReactElement => {
  const {
    assistants,
    remove,
    inquiry,
    setCurrentFacilityAssistant,
    onSubmit,
    // modal
    modalControll,
    setModalControll,
    resetModalControll,
    // form
    form,
    setForm,
    resetForm,
  } = useFacilityAssistant();

  const actionButtons: MyAnimatedButtonProps[] = useMemo(() => {
    return [
      {
        title: "Asisten Fasilitas",
        color: "info",
        startIcon: <Add />,
        onClick: () => setModalControll("formFacilityAsisten", true),
      },
    ];
  }, []);

  const {
    content: deleteConfirmation,
    handler: deleteConfirmationHandler,
    visibility: deleteConfirmationVisibility,
  } = useConfirmation<number>(
    {
      title: "Konfirmasi Hapus",
      description: "Apakah kamu yakin ingin menghapus item ini?",
      cancelText: "Kembali",
      confirmText: "Ya",
    },
    0
  );

  const handleEdit = (id: string): void => {
    inquiry(id);
  };

  const handleOpenDetail = (assistant: IFacilityAssistant) => {
    setCurrentFacilityAssistant(assistant);
  };

  const handleSelectChange = (name: string, value: any) => {
    setForm(name, value);
  };

  const handleDelete = (id: number) => {
    deleteConfirmationHandler.open();
    deleteConfirmationHandler.setState(id);
  };

  const handleConfirmDelete = () => {
    deleteConfirmationHandler.confirm().then((id) => remove(id));
  };

  const handleCloseModal = () => {
    resetModalControll();
    resetForm();
  };

  return (
    <>
      <Suspense>
        <Section
          title="Asisten Fasilitas"
          description="Kelola asisten fasilitas properti Anda"
          actionButton={<ActionButton buttons={actionButtons} />}
        >
          <TableFacilityAssistantView
            assistants={assistants}
            onDelete={handleDelete}
            onEdit={handleEdit}
            openDetail={handleOpenDetail}
          />
        </Section>
      </Suspense>
      <Suspense>
        <FormFacilityAsisten
          visible={modalControll.formFacilityAsisten}
          edit={false}
          loading={false}
          onClose={handleCloseModal}
          form={form}
          onInputChange={() => {}}
          onSelectChange={handleSelectChange}
          onSubmit={onSubmit}
        />
      </Suspense>

      <Suspense>
        <Confirmation
          open={deleteConfirmationVisibility}
          title={deleteConfirmation.title}
          description={deleteConfirmation.description}
          cancelText={deleteConfirmation.cancelText}
          confirmText={deleteConfirmation.confirmText}
          onClose={deleteConfirmationHandler.close}
          onCancel={deleteConfirmationHandler.cancel}
          onConfirm={handleConfirmDelete}
        />
      </Suspense>
    </>
  );
};

export default FacilityAssitantView;
