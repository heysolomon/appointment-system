import Image from "next/image"
import logo from "./nsuk_logo.png"

export const NsukLogo = () => {
    return (
      <Image src={logo} alt='background' className='' width={50}  />
    )
  }
