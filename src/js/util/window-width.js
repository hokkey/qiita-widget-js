export default function getWindowWidth() {
  return Math.max(
    document.documentElement["clientWidth"],
    document.body["scrollWidth"],
    document.documentElement["scrollWidth"],
    document.body["offsetWidth"],
    document.documentElement["offsetWidth"]
  );
}
