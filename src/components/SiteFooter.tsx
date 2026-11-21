import { profile } from "@content/profile";
import { ui } from "@content/ui";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer className="footer">
      <div className="footer-inner mx-auto flex max-w-[1040px] flex-wrap justify-between gap-2 px-5">
        <span>
          © {year} {profile.name}
        </span>
        <span>{ui.footer.built}</span>
      </div>
    </footer>
  );
}
