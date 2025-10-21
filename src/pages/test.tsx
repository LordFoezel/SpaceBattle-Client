import { useEffect, useState } from 'react';
import { BaseInput } from '../components/base/input/BaseInput'
import { BaseInputNumber } from '../components/base/input/BaseInputNumber'
import { BaseInputEmail } from '../components/base/input/BaseInputEmail'
import { BaseInputPassword } from '../components/base/input/BaseInputPassword'
import { BaseTextarea } from '../components/base/input/BaseTextarea'
import { BaseText } from '../components/base/text/BaseText'
import { BaseButton } from '../components/base/button/BaseButton'
import { BaseSelect } from '../components/base/select/BaseSelect'
import { BaseSelectMulti } from '../components/base/select/BaseSelectMulti'
import { BaseCheckbox } from '../components/base/checkbox/BaseCheckbox'
import { BaseSwitch } from '../components/base/checkbox/BaseSwitch'
import { BaseModal } from '../components/base/dialog/BaseModal'
import { BaseLabel } from '../components/base/label/BaseLabel'
import { BaseSeparator } from '../components/base/text/BaseSeparator'
import { MainCard } from '../components/layout/MainCard';
import { PageHeader } from '../components/layout/PageHeader';
import { BaseInputSearch } from '../components/base/input/BaseInputSearch';

export default function TestPage() {
  const [controlledOpen, setControlledOpen] = useState(false);
  const options = [
    { label: "Element 1", value: "1", selectable: true },
    { label: "Element 2", value: "2", selectable: true },
    { label: "Element 3", value: "3", selectable: false },
    { label: "element 4", value: "11", selectable: true },
    { label: "element 5", value: "10", selectable: true },
    { label: "element 6", value: "100", selectable: true },
  ];

  const optionsCategory = [
    { label: "Core Element 1", value: "1", selectable: true, category: "Core" },
    { label: "Core Element 2", value: "2", selectable: true, category: "Core" },
    { label: "Core Element 1", value: "3", selectable: false, category: "Core" },
    { label: "Test element 1", value: "11", selectable: true, category: "Test" },
    { label: "Test element 2", value: "10", selectable: true, category: "Test" },
    { label: "Single element", value: "100", selectable: true, category: "Single" },
  ];

  useEffect(() => {
    const t = setTimeout(() => globalThis.notify.error(), 3500);
    return () => clearTimeout(t);
  }, []);

 function onChange(e) {
    console.log(e.target.value);
  }

  return (
    <section className="testing-page">
      <MainCard>
        <PageHeader title={globalThis.t("page.test.title")} info={globalThis.t("page.test.info")} />
        <BaseInputSearch onChange={onChange} />
        <BaseInput />
        <BaseInputNumber />
        <BaseInputEmail />
        <BaseInputPassword />
        <BaseTextarea />
        <BaseButton> <BaseText color="text-gray-900">TextBase</BaseText></BaseButton>
        <BaseSelect variant="subtle" options={options} />
        <BaseSelect options={optionsCategory} />
        <BaseSelectMulti options={options} />
        <BaseSelectMulti options={optionsCategory} />
        <BaseSwitch />
        <BaseSwitch isDisabled={false} value={1} />
        <BaseCheckbox value="1" />
        <BaseCheckbox value={true} />
        {/* Default, unkontrolliert */}
        <BaseModal placement="top" buttonText="Open Top" title="Top Dialog" />
        {/* Mit Custom Trigger-Props */}
        <BaseModal
          placement="center"
          title="Center Dialog"
          buttonText="Open Center"
          triggerProps={{ variant: 'outline', size: 'sm' }}
        >
          <BaseText fontSize="sm">Modal content with custom trigger</BaseText>
        </BaseModal>
        {/* Kontrollierte Variante */}
        <BaseModal
          title="Controlled Dialog"
          buttonText="Open Controlled"
          isOpen={controlledOpen}
          onOpen={() => setControlledOpen(true)}
          onClose={() => setControlledOpen(false)}
          confirmText="Okay"
          cancelText="Close"
          confirmButtonProps={{ variant: 'solid', size: 'sm' }}
          cancelButtonProps={{ variant: 'outline', size: 'sm' }}
        >
          <BaseText fontSize="sm">Controlled modal body</BaseText>
        </BaseModal>
        <BaseLabel label='E-Mail' info='Enter your E-Mail' variant='transparent'>
          <BaseInputEmail />
        </BaseLabel>
        <BaseLabel label='Password' variant='transparent'>
          <BaseInputPassword />
        </BaseLabel>
        <BaseSeparator />
        <BaseLabel label='Password' variant='transparent' direction="horizontal">
          <BaseInputPassword />
        </BaseLabel>
        <BaseLabel label='E-Mail' info='Enter your E-Mail' variant='transparent' direction="horizontal">
          <BaseInputPassword />
        </BaseLabel>
      </MainCard>
    </section>
  );
}



