import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // Đọc dữ liệu từ request
    const { name, email } = await request.json();

    // Kiểm tra nếu name hoặc email bị thiếu
    if (!name || !email) {
      return new Response(
        JSON.stringify({ message: "Name and email are required" }),
        { status: 400 }
      );
    }

    // Tạo người dùng mới trong cơ sở dữ liệu
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    // Trả về đối tượng người dùng vừa tạo
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error(error); // In lỗi ra console cho dễ debug

    // Trả về thông báo lỗi chi tiết hơn
    return new Response(JSON.stringify({ message: "Error creating user" }), {
      status: 500,
    });
  }
}

// Xử lý GET yêu cầu lấy danh sách người dùng
export async function GET() {
  try {
    // Lấy tất cả người dùng từ cơ sở dữ liệu
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error(error); // Log lỗi chi tiết
    return new Response(
      JSON.stringify({ message: "Error fetching users"}),
      { status: 500 }
    );
  }
}

