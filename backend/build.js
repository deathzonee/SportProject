const fs = require("fs-extra");

async function build() {
  try {
    // Xóa thư mục dist nếu tồn tại
    await fs.remove("dist");
    console.log("dist folder removed");

    // Tạo lại thư mục dist
    await fs.mkdir("dist");
    console.log("dist folder created");

    // Sao chép các file từ src sang dist
    await fs.copy("src", "dist");
    console.log("Files copied from src to dist");
  } catch (err) {
    console.error("Error during build:", err);
  }
}

build();
