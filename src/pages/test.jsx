import { BaseInput } from '../components/base/input/BaseInput.jsx'
import { BaseInputNumber } from '../components/base/input/BaseInputNumber.jsx'
import { BaseInputEmail } from '../components/base/input/BaseInputEmail.jsx'
import { BaseInputPassword } from '../components/base/input/BaseInputPassword.jsx'
import { BaseTextarea } from '../components/base/input/BaseTextarea.jsx'
import { BaseText } from '../components/base/text/BaseText.jsx'
import { BaseButton } from '../components/base/button/BaseButton.jsx'
import { BaseSelect } from '../components/base/select/BaseSelect.jsx'
import { BaseSelectMulti } from '../components/base/select/BaseSelectMulti.jsx'
import { BaseCheckbox } from '../components/base/checkbox/BaseCheckbox.jsx'
import { BaseSwitch } from '../components/base/checkbox/BaseSwitch.jsx'
import { BaseModal } from '../components/base/dialog/BaseModal.jsx'
import { BaseCard } from '../components/base/layout/BaseCard.jsx'
import { BaseLabel } from '../components/base/label/BaseLabel.jsx'

export default function TestPage() {
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

  return (
    <section className="testing-page">

      <BaseCard direction="col" variant='medium' >
        <BaseLabel label='E-Mail' info='Enter your E-Mail' variant='transparent'>
          <BaseInputEmail />
        </BaseLabel>
        <BaseLabel label='Password' variant='transparent'>
          <BaseInputPassword />
        </BaseLabel>

              <BaseLabel label='Password' variant='transparent' direction="horizontal">
          <BaseInputPassword />
        </BaseLabel>
                <BaseLabel label='Password' info='Enter your E-Mail' variant='transparent' direction="horizontal">
          <BaseInputPassword />
        </BaseLabel>

      </BaseCard>
      <BaseCard direction="col" >
        <BaseText uppercase fontSize="3xl" >Test Page</BaseText>
        <BaseText color="text-red-300">To Test New Components</BaseText>
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
      </BaseCard>
      <BaseCard>
        <BaseSwitch />
        <BaseSwitch isDisabled={false} value={1} />
        <BaseCheckbox value="1" />
        <BaseCheckbox value={true} />
      </BaseCard>
      <BaseCard>
        <BaseModal placement="top" buttonText="Open Top" title="Top Dialog" />
        <BaseModal placement="center" buttonText="Open Center" title="Center Dialog" />
        <BaseModal placement="center" buttonText="Open Center" title="Center Dialog" />
        <BaseModal placement="center" buttonText="Open Center" title="Center Dialog" />
      </BaseCard>


    </section>
  );
}
