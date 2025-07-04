export async function deletePost(postId: string, returnPath: string): Promise<void> {
    // 1. Hỏi người dùng xác nhận
    if (!confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
        return; // Nếu người dùng hủy, không làm gì cả
    }

    // 2. Kiểm tra postId
    if (!postId) {
        console.error("Post ID is missing.");
        alert("Không thể xóa bài viết: ID không hợp lệ.");
        return;
    }

    try {
        // 3. Gọi API để xóa
        const response = await fetch(`/api-v1/posts/delete-post/${postId}`, {
            method: "POST", // Hoặc "DELETE" nếu API của bạn hỗ trợ
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Xóa bài viết không thành công");
        }

        // 4. Thông báo thành công và chuyển hướng
        alert("Đã xóa bài viết thành công!");
        window.location.href = returnPath;

    } catch (error) {
        console.error("Lỗi khi xóa bài viết:", error);
        alert(`Đã xảy ra lỗi: ${error instanceof Error ? error.message : "Lỗi không xác định"}`);
    }
}