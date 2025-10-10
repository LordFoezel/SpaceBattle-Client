import { BaseInput } from '../components/inputs/baseInput.jsx'
import { BaseInputNumber } from '../components/inputs/baseInputNumber.jsx'
import { BaseInputEmail } from '../components/inputs/baseInputEmail.jsx'
import { BaseInputPassword } from '../components/inputs/baseInputPassword.jsx'
import { BaseTextarea } from '../components/inputs/baseTextarea.jsx'
import { BaseText } from '../components/text/baseText.jsx'
import { BaseButton } from '../components/buttons/BaseButton.jsx'

export default function TestPage() {
  const text = 'Hello Peoples'


  return (
    <section className="testing-page">
      <BaseText uppercase fontSize="3xl" >Test Page</BaseText>
      <BaseText  color="text-red-300">To Test New Components</BaseText>
      <BaseInput />
      <BaseInputNumber />
      <BaseInputEmail />
      <BaseInputPassword />
      <BaseTextarea />
      <BaseButton> <BaseText  color="text-gray-900">TextBase</BaseText></BaseButton>
    </section>
  );
}
