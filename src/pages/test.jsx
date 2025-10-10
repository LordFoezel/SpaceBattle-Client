import { BaseInput } from '../components/base/inputs/BaseInput.jsx'
import { BaseInputNumber } from '../components/base/inputs/BaseInputNumber.jsx'
import { BaseInputEmail } from '../components/base/inputs/BaseInputEmail.jsx'
import { BaseInputPassword } from '../components/base/inputs/BaseInputPassword.jsx'
import { BaseTextarea } from '../components/base/inputs/BaseTextarea.jsx'
import { BaseText } from '../components/base/text/BaseText.jsx'
import { BaseButton } from '../components/base/buttons/BaseButton.jsx'
import { BaseSelect } from '../components/base/selects/BaseSelect.jsx'
import { BaseSelectMulti } from '../components/base/selects/BaseSelectMulti.jsx'

export default function TestPage() {
  const options = [
    { label: "Element 1", value: "1", selectable: true },
    { label: "Element 2", value: "2", selectable: true},
    { label: "Element 3", value: "3", selectable: false},
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
    </section>
  );
}
