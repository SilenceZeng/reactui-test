export default function classes(...names: (string | undefined)[]) {
  return names.filter(Boolean).join(' ')
}
