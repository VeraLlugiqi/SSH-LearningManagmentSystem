# SSH-LearningManagmentSystem
Projekti ne lenden Sistemet e Shperndara



**Implementimi i ORM-së me Mongoose:**

Për të lidhur aplikacionin tonë Node.js me MongoDB, kemi përdorur Mongoose si ORM për menaxhimin e bazës së të dhënave. Këtu është një pasqyrë e shkurtër e strukturës së projektit dhe implementimit të Mongoose:

1. **Lidhja me bazën e të dhënave:**
   Për të lidhur aplikacionin tonë me MongoDB, kemi shkruar një funksion të quajtur `connectDB` që përdor të dhënat konfiguruese nga fajlli `.env` dhe lidhjen e siguron me MongoDB duke përdorur Mongoose. Këtu është një rresht i kodit për lidhjen:

   ```javascript
   mongoose.connect(dbUrl);
   ```

2. **Modeli i përdoruesit:**
   Kemi implementuar një model të quajtur `IUser` për të përfaqësuar të dhënat e përdoruesve në bazën tonë të të dhënave duke përdorur `userSchema`. Krijimi i modelit dhe lidhja me koleksionin e bazës së të dhënave bëhet në këtë mënyrë:

   ```javascript
   const userModel = mongoose.model("User", userSchema);
   ```

3. **Operacionet e përdoruesit:**
   Kemi implementuar funksione për regjistrimin e përdoruesve, aktivizimin e llogarive, kyçjen dhe çkyçjen e përdoruesve duke përdorur modelin e përdoruesit dhe funksionet e sigurisë. Këtu është një rresht për krijimin e modelit të përdoruesit:

   ```javascript
   const userSchema = new mongoose.Schema({...});
   ```

