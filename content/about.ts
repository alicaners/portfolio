export type About = {
  title: string;
  paragraphs: readonly string[];
  facts: readonly { label: string; value: string }[];
};

export const about: About = {
  title: "Hakkımda",
  paragraphs: [
    "Sakarya Üniversitesi'nde Yazılım Mühendisliği 3. sınıf öğrencisiyim. En çok sevdiğim şey, bir fikrin çalışan bir ürüne dönüştüğü süreç: ihtiyacı anlamak, sistemi parçalarına ayırmak ve her parçayı sağlam kurmak.",
    "Güçlü olduğum taraf backend. Bir servis çöktüğünde sistemin nasıl ayakta kalacağı gibi sorularla uğraşmayı seviyorum; test yazmak ve bir hatanın kök nedenini bulmak benim için işin bir parçası.",
  ],
  facts: [
    { label: "Okul", value: "Sakarya Üniversitesi · 3. sınıf" },
    { label: "Odak", value: "Backend · Java / Spring Boot · C# / .NET" },
    { label: "Arıyorum", value: "2027 yazı stajı" },
  ],
};
