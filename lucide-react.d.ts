declare module 'lucide-react' {
  import { SVGProps } from 'react'
  
  export interface LucideIconProps extends SVGProps<SVGSVGElement> {
    size?: number | string
    color?: string
    absoluteStrokeWidth?: boolean
  }
  
  export const LucideIcon: React.FC<LucideIconProps>
  
  export const Crown: React.FC<LucideIconProps>
  export const UserPlus: React.FC<LucideIconProps>
  export const CheckCircle2: React.FC<LucideIconProps>
  export const ChevronRight: React.FC<LucideIconProps>
  export const Gamepad2: React.FC<LucideIconProps>
  export const ArrowLeft: React.FC<LucideIconProps>
  
  export default LucideIcon
}
