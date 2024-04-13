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

**Migrimet e Bazës së të Dhënave**

Projekti ynë përdor migrate-mongo për menaxhimin e migrimeve të bazës së të dhënave MongoDB. 

   1. **Konfigurimi i Migrimeve**
      
      Konfigurimi i migrate-mongo është vendosur në skedarin `config.js`. Ky skedar përmban konfigurimet e nevojshme për lidhjen me bazën e të dhënave MongoDB dhe menaxhimin e migrimeve. Në këtë skedar, kemi përcaktuar:

      - **URL-në për lidhjen me MongoDB**: Për të siguruar lidhjen me bazën e të dhënave për migrime.
      - **Emrin e bazës së të dhënave**: Emrin e bazës së të dhënave në MongoDB.
      - **Opsionet shtesë**: Për të përcaktuar opsione të ndryshme për lidhjen me MongoDB.
      - **Direktorinë e migrimeve**: Ku ruhen skriptet e migrimeve.
      - **Emrin e koleksionit të ndryshimeve**: Emrin e koleksionit në MongoDB ku ruhen ndryshimet e aplikuar.
      - **Zgjatjen e skripteve të migrimit**: Tipin e skripteve të migrimit (p.sh. .js).
      - **Aktivizimin e algoritmit për të krijuar një checksum**: Për të përcaktuar nëse të përdoret algoritmi për të kontrolluar përmbajtjen e skripteve të migrimit.
      - **Sistemin e modulit**: Llojin e modulit të përdorur në migrime (p.sh. commonjs).
   
   2. **Implementimi i Migrimeve**
   
      Skriptet e migrimit janë të vendosura në direktorinë e caktuar, siç është specifikuar në konfigurimin tonë. Secila migrim përmban dy funksione:
      
      up: Ky funksion zbatohet për të kryer ndryshimet në bazën e të dhënave. Në shembullin tonë, ne përdorim funksionin për të ndryshuar emrin e fushës "Name" në "fullName" në koleksionin "users".
      
      down: Ky funksion përmban ndryshimet për të kthyer migrimin prapa në gjendjen fillestare, nëse është e mundur. Në rastin tonë, kthejmë emrin e fushës "fullName" në "Name".


