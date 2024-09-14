import "./RichContent_Templates.css";
import Image from "@/lib/component/generic/pure/image";

type Props = {};

export default function RichContent_template_1({}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "40px",
        gap: "24px",
      }}
      className="rich_content_template_1"
    >
      {/* main banner row */}
      <section>
        <Image src="main_banner_placeholder" style={{ borderRadius: "20px" }} />
      </section>

      {/* ======================= */}

      {/* regular row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(1, 1fr)",
          gridGap: "12px",
        }}
      >
        {/* image */}
        <div>
          <Image src="image_placeholder" style={{ borderRadius: "20px" }} />
        </div>
        {/* text */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: "#ffffff",
            padding: "16px",
            borderRadius: "20px",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <h4>header_placeholder</h4>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontSize: "14px",
                listStyle: "inside",
              }}
            >
              bullets_placeholder
            </ul>
          </div>
        </div>
      </div>

      {/* ======================= */}
    </div>
  );
}
